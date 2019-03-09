import Vue from "vue";
import { mount } from "@vue/test-utils";
import Management from "@/views/Management.vue";

describe("Management.vue", () => {
  const fakeData = [
    { id: 0, isCompleted: false, content: "등산하기", createdAt: 1550984912840, completedAt: null },
    { id: 1, isCompleted: false, content: "축구하기", createdAt: 1550984912840, completedAt: null },
    { id: 2, isCompleted: false, content: "Vue 스터디 참여", createdAt: 1550984912840, completedAt: null },
  ];

  const ManagementView = mount(Management);

  ManagementView.setData({
    list: fakeData,
    active: "ALL",
  });

  it("FakeData 3개의 일정을 가지고 시작합니다, 그리고 상태는 ALL 입니다.", () => {
    const count = ManagementView.findAll(".item").length;
    expect(count).toBe(3);
    expect(ManagementView.vm.$data.active).toBe("ALL");
  });

  it("일정을 추가합니다.", () => {
    ManagementView.find("input").setValue("산책하기");
    ManagementView.find("form").trigger("submit.prevent");
    const count = ManagementView.findAll(".item").length;
    const content = ManagementView.findAll(".item").at(0).find("div.content").text();
    expect(count).toBe(4);
    expect(content).toBe("산책하기");
  });

  it("일정을 완료합니다.", () => {
    const content = ManagementView.findAll(".item").at(0).find("input[type=checkbox]");
    content.trigger("click");
    expect(ManagementView.vm.$data.list[0].isCompleted).toBe(true);
  });

  it("상태를 각 차례 변경하여 체크합니다. ( ALL | ACTIVE | COMPLETED )", () => {
    const allButton = ManagementView.find("button.all");
    const activeButton = ManagementView.find("button.active");
    const completedButton = ManagementView.find("button.completed");

    allButton.trigger("click");
    expect(ManagementView.vm.$data.active).toBe("ALL");
    expect(ManagementView.findAll(".item").length).toBe(4);

    activeButton.trigger("click");
    expect(ManagementView.vm.$data.active).toBe("ACTIVE");
    expect(ManagementView.findAll(".item").length).toBe(3);

    completedButton.trigger("click");
    expect(ManagementView.vm.$data.active).toBe("COMPLETED");
    expect(ManagementView.findAll(".item").length).toBe(1);

    ManagementView.setData({ active: "ALL" });
  });

  it("일정의 완료를 취소합니다.", () => {
    const content = ManagementView.findAll(".item").at(0).find("input[type=checkbox]");
    content.trigger("click");
    expect(ManagementView.vm.$data.list[0].isCompleted).toBe(false);
  });

  it("일정을 삭제합니다.", () => {
    const removeButton = ManagementView.findAll(".item").at(0).find("button.remove");
    removeButton.trigger("click");
    const count = ManagementView.findAll(".item").length;
    expect(count).toBe(3);
  });

  it("모든 일정을 초기화합니다.", () => {
    const allRemoveButton = ManagementView.find("button.clear");
    allRemoveButton.trigger("click");
    expect(ManagementView.findAll(".item").length).toBe(0);
  });
});
